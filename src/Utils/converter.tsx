import { createHeadlessEditor } from '@lexical/headless';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import  buildConfig from '../payload.config'; 
import { $getRoot } from 'lexical'
import type { FieldHook } from 'payload';
import { defaultEditorConfig, defaultEditorFeatures, getEnabledNodes, sanitizeServerEditorConfig,SerializedUploadNode } from '@payloadcms/richtext-lexical';



  export const lexicalToPlainTextFieldHook: FieldHook = async (args) => {
    const { value } = args;
    if(value) {
      const editorConfig = defaultEditorConfig;
      editorConfig.features = [...defaultEditorFeatures];
      const payloadConfig = await buildConfig;
      const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, payloadConfig);

        // initiate the headless editor
      const headlessEditor = createHeadlessEditor({
        nodes: getEnabledNodes({
          editorConfig: sanitizedEditorConfig,
        }),
      });

    try {
      headlessEditor.setEditorState(headlessEditor.parseEditorState(value))
    } catch (e) {
      console.error({ err: e }, 'ERROR parsing editor state')
    }
    // Export to plain text
   let plaintext = '';
    headlessEditor.getEditorState().read(() => {
      plaintext =  $getRoot().getTextContent()
    }) 
    console.log('Generated Plaintext:', plaintext);
    return plaintext
    }
   
  }


  export async function convertRichTextToMarkdown(value: any) {
    if (value) {
        const editorConfig = defaultEditorConfig;
        editorConfig.features = [...defaultEditorFeatures];
        const payloadConfig = await buildConfig;

        const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, payloadConfig);

        const headlessEditor = createHeadlessEditor({
            nodes: getEnabledNodes({
                editorConfig: sanitizedEditorConfig,
            }),
        });

        try {
            headlessEditor.setEditorState(headlessEditor.parseEditorState(value));
        } catch (e) {
            console.error('ERROR parsing editor state', e);
            return "";
        }

        let markdown = "";
        headlessEditor.getEditorState().read(() => {
            markdown = $convertToMarkdownString(TRANSFORMERS);
        });

        console.log('Generated Markdown:', markdown);
        return markdown;
    } 
}

