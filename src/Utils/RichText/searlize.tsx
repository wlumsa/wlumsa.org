//https://github.com/payloadcms/payload/blob/beta/templates/website/src/app/components/RichText/nodeFormat.tsx

import { SerializedListItemNode, SerializedListNode } from '@payloadcms/richtext-lexical'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import type { LinkFields, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedElementNode, SerializedLexicalNode, SerializedTextNode } from 'lexical'
import { cn } from '../cn'
import React, { Fragment, JSX } from 'react'


import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
  IS_ALIGN_CENTER,
  IS_ALIGN_END,
  IS_ALIGN_JUSTIFY,
  IS_ALIGN_LEFT,
  IS_ALIGN_RIGHT,
  IS_ALIGN_START
} from "./nodeFormat"

interface Props {
  nodes: SerializedLexicalNode[]
}


export function serializeLexical({ nodes }: Props): JSX.Element {
  const classNames = {
    h1: 'mt-6 text-5xl font-bold',
    h2: 'mt-5 text-4xl font-bold',
    h3: 'mt-4 text-3xl font-bold',
    h4: 'mt-3 text-2xl font-bold',
    h5: 'mt-2 text-xl font-bold',
    h6: 'mt-1 text-lg font-bold',
    p: 'text-base',
    ul: 'list-disc',
    ol: 'list-decimal',
    li: 'list-item',
    blockquote: 'font-bold text-lg text-gray-600',
    a: 'text-blue-500 underline',
  }
  return (
    <Fragment>

      {nodes?.map((_node, index): JSX.Element | null => {
        if (_node.type === 'text') {

          const node = _node as SerializedTextNode
          

          let text = <React.Fragment key={index}>{node.text}</React.Fragment>

          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }


          return text
        }



        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: SerializedElementNode): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (node?.type === 'list' && (node as SerializedListNode)?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
              return serializeLexical({ nodes: node.children })
            } else {
              return serializeLexical({ nodes: node.children })
            }
          }
        }

        const serializedChildren =
          'children' in _node ? serializedChildrenFn(_node as SerializedElementNode) : ''

        switch (_node.type) {
          case 'linebreak': {
            return <br className="col-start-2" key={index} />
          }
          case 'paragraph': {
            const node = _node as SerializedElementNode;
            if (node.children.length === 0) {
              // Render a paragraph with a new line or placeholder
              return <p key={index} className='mt-6'>
              &#8203;&nbsp;
            </p>// Using a non-breaking space as placeholder
            } else {
              return (
                <p className={`${generateTextAlign(node)} col-start-2 text-xl text-muted-foreground mt-6`} key={index}>
                  {serializedChildren}
                </p>
              )
            }
          }
          case 'heading': {
            const node = _node as SerializedHeadingNode

            type Heading = Extract<keyof JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
            const Tag = node?.tag as Heading
            return (
              <Tag className={`${classNames[node.tag]} ${generateTextAlign(node)} col-start-2`} key={index}>
                {serializedChildren}
              </Tag>
            )
          }
          case 'list': {
            const node = _node as SerializedListNode

            type List = Extract<keyof JSX.IntrinsicElements, 'ol' | 'ul'>
            const Tag = node?.tag as List
            return (
              <Tag className="list col-start-2" key={index}>
                {serializedChildren}
              </Tag>
            )
          }
          case 'listitem': {
            const node = _node as SerializedListItemNode

            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={` ${node.checked ? '' : ''}`}
                  key={index}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              )
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              )
            }
          }
          case 'quote': {
            return (
              <blockquote className="col-start-2" key={index}>
                {serializedChildren}
              </blockquote>
            )
          }
          default:
            return null;
        }


      })}
    </Fragment>
  )
}
function generateTextAlign(node: SerializedElementNode) {
  if (node.format === 'right') return 'text-right'
  if (node.format === 'center') return 'text-center'
  else return ''
}

/*
import escapeHTML from 'escape-html';
import React, { Fragment } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';


export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

function generateTextAlign(node) {
  if (node.format === 'right') return 'text-right'
  if (node.format === 'center') return 'text-center'
  else return ''
}

export default function serializeLexicalRichText({ children, customClassNames, parentNode = {} }) {
  return (children?.map((node, i) => {
    const classNames = {
      h1: 'mt-6 text-5xl font-bold',
      h2: 'mt-5 text-4xl font-bold',
      h3: 'mt-4 text-3xl font-bold',
      h4: 'mt-3 text-2xl font-bold',
      h5: 'mt-2 text-xl font-bold',
      h6: 'mt-1 text-lg font-bold',
      p: 'text-base',
      ul: 'list-disc',
      ol: 'list-decimal',
      li: 'list-item',
      blockquote: 'font-bold text-lg text-gray-600',
      a: 'text-blue-500 underline',
    }




    if (node.type === 'text') {
      let text = node.text ? <span className=''>{node.text}</span> : <span className='opacity-0'>&nbsp;</span>;

      if (node.format & IS_BOLD) {
        text = (
          <strong key={i}>
            {text}
          </strong>
        );
      }

      if (node.format & IS_CODE) {
        text = (
          <code key={i}>
            {text}
          </code>
        );
      }

      if (node.format & IS_ITALIC) {
        text = (
          <em key={i}>
            {text}
          </em>
        );
      }

      if (node.format & IS_UNDERLINE) {
        text = (
          <span
            className='underline'
            key={i}
          >
            {text}
          </span>
        );
      }

      if (node.format & IS_STRIKETHROUGH) {
        text = (
          <span
            className='line-through'
            key={i}
          >
            {text}
          </span>
        );
      }

      return (
        <Fragment key={i}>
          {text}
        </Fragment>
      );
    }

    if (!node) {
      return null;
    }

    if (node.type === 'heading') {
      return (
        <node.tag className={`${classNames[node.tag]} ${generateTextAlign(node)}`} key={i}>
          {serializeLexicalRichText({ children: node.children })}
        </node.tag>
      );
    }

    if (node.type === 'list') {
      if (node.listType === 'bullet') {
        return (
          <ul className={`${classNames.ul}`} key={i}>
            {serializeLexicalRichText({ children: node.children, parentNode: node })}
          </ul>
        );
      } else if (node.listType === 'check') {
        return (
          <ul className={`${classNames.ul} list-none`} key={i}>
            {serializeLexicalRichText({ children: node.children, parentNode: node })}
          </ul>
        );
      } else if (node.listType === 'number') {
        return (
          <ol className={`${classNames.ol}`} key={i}>
            {serializeLexicalRichText({ children: node.children, parentNode: node })}
          </ol>
        )
      }
    }

    if (node.type === 'listitem' && node.checked) {
      return (
        <li className={`${classNames.li} flex gap-1`} key={i}>
          <div>
            <MdCheckBox className='w-4 h-4 text-green-500' />
          </div>
          <div className='line-through'>
            {serializeLexicalRichText({ children: node.children })}
          </div>
        </li>
      );
    } else if (node.type === 'listitem' && parentNode.listType === 'check') {
      return (
        <li className={`${classNames.li} flex gap-1`} key={i}>
          <div>
            <MdCheckBoxOutlineBlank className='w-4 h-4 text-green-500' />
          </div>
          <div className=''>
            {serializeLexicalRichText({ children: node.children })}
          </div>
        </li>
      );
    } else if (node.type === 'listitem') {
      return (
        <li className={`${classNames.li}`} key={i}>
          {serializeLexicalRichText({ children: node.children })}
        </li>
      );
    }

    switch (node.type) {

      case 'quote':
        return (
          <blockquote className={`${classNames.blockquote}`} key={i}>
            {serializeLexicalRichText({ children: node.children })}
          </blockquote>
        );

      case 'link':
        return (
          <a className={`${classNames.a}`}
            href={escapeHTML(node.fields?.linkType === 'custom' ? node?.fields?.url : '')}
            target={node.fields?.newTab ? '_blank' : '_self'}
            key={i}
          >
            {serializeLexicalRichText({ children: node.children })}
          </a>
        );


      default:
        return (
          <p className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
            {serializeLexicalRichText({ children: node.children })}
          </p>
        );
    }
  }).filter((node) => node !== null)
  );
}
  */