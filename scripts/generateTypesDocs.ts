/* eslint-disable no-console */
import colors from 'colors';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const sourceFile = path.join(__dirname, '../src/typings/types.ts');
const templateFile = path.join(__dirname, '../templates/README.tpl.md');
const outputFile = path.join(__dirname, '../README.md');
const JOYSTICK_PROPS_PLACEHOLDER = '{{JOYSTICK_PROPS_PLACEHOLDER}}';
const JOYSTICK_REF_PLACEHOLDER = '{{JOYSTICK_REF_PLACEHOLDER}}';

const propsDocHeader = `
| Property | Description | Type | Default |
|----------|-------------|------|---------|
`;

const refDocHeader = `
| Handler  | Description | Type |
|----------|-------------|------|
`;

const getDescription = (docs: readonly ts.JSDocTag[]) => {
  const desc = docs.find((item) => item.tagName.escapedText === 'description');
  return (desc?.comment?.toString() || '-').replace(/\n/g, '<br />');
};

const getDefaultValue = (docs: readonly ts.JSDocTag[]) => {
  const defaultValue = docs.find((item) => item.tagName.escapedText === 'default');
  return defaultValue?.comment || '-';
};

const getType = (member: ts.PropertySignature, source: ts.SourceFile) => {
  return (member.type ? member.type.getText(source) : 'any').replace(/\|/g, '\\|');
};

function generateMarkdownTable() {
  const program = ts.createProgram([sourceFile], {});
  const source = program.getSourceFile(sourceFile);
  program.getTypeChecker();

  if (!source) {
    throw new Error('Source file not found');
  }

  const template = fs.readFileSync(templateFile, 'utf8');

  let propsDoc = propsDocHeader;
  let refDoc = refDocHeader;
  source.statements.forEach((statement) => {
    if (ts.isInterfaceDeclaration(statement)) {
      if (statement.name.text === 'IJoystickProps') {
        statement.members.forEach((member) => {
          if (ts.isPropertySignature(member) && member.name) {
            const name = member.name.getText(source);
            const type = getType(member, source);
            const docs = ts.getJSDocTags(member);
            const desc = getDescription(docs);
            const defaultValue = getDefaultValue(docs);
            propsDoc += `| ${name} | ${desc} | \`${type}\` | ${defaultValue} |\n`;
          }
        });
      } else if (statement.name.text === 'IJoystickRef') {
        statement.members.forEach((member) => {
          if (ts.isPropertySignature(member) && member.name) {
            const name = member.name.getText(source);
            const type = getType(member, source);
            const docs = ts.getJSDocTags(member);
            const desc = getDescription(docs);
            refDoc += `| ${name} | ${desc} | \`${type}\` |\n`;
          }
        });
      }
    }
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(
    outputFile,
    template
      .replace(JOYSTICK_PROPS_PLACEHOLDER, propsDoc)
      .replace(JOYSTICK_REF_PLACEHOLDER, refDoc),
  );
  console.log(colors.green('Documentation generated successfully!'));
}

generateMarkdownTable();
