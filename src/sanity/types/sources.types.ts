import { PortableTextBlock } from "@portabletext/types";

export type SanityRichTextSource = string | PortableTextBlock[];

export type SanityCtaSource = {
  _key: string;
  text: string;
  url: string;
  openInNewTab?: boolean;
};
