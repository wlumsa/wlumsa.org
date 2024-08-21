import { createHeadlessEditor } from '@lexical/headless';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import  buildConfig from '../payload.config'; 
import { $getRoot, SerializedEditorState } from 'lexical'
import type { FieldHook } from 'payload';
import { defaultEditorConfig, defaultEditorFeatures, getEnabledNodes, sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical';
import { isPlain } from '@reduxjs/toolkit';

//This file contains a hook definition that converts Lexical Richtext to Markdown and Lexical to Plain text. 


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

  export const lexicalToPlainTextFieldHook: FieldHook = async (args) => {
    const { value, context } = args;
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