import { createHeadlessEditor } from '@lexical/headless';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import  buildConfig from '../payload.config'; 
import { SanitizedConfig } from 'payload';

import type { FieldHook } from 'payload';
import { defaultEditorConfig, defaultEditorFeatures, getEnabledNodes, sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical';

//This file contains a hook definition that converts Lexical Richtext to Markdown. 


export const lexicalToMarkdownFieldHook: FieldHook = async (args) => {
    const { value, context } = args;
  
    if (value) { // check if there's content
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
        headlessEditor.setEditorState(headlessEditor.parseEditorState(value));
      } catch (e) {
        console.error({ err: e }, 'ERROR parsing editor state');
      }
  
      // Export to markdown
      let markdown = '';
      headlessEditor.getEditorState().read(() => {
        markdown = $convertToMarkdownString(TRANSFORMERS);
      });
  
      context[`${args.field.name}_markdown`] = markdown;
      //test
      console.log('Generated Markdown:', markdown);
    }
  };