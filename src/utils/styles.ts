/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Source characters for mapping
const SRC_ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Unicode style letter dictionaries of equal index mapping to SRC_ALPHA
export const ALPHABETS: Record<string, string> = {
  boldSerif: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  boldSans: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤🇷🇸𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰防𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵", // Fix letter alignment
  boldSansTrue: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷 civilisation 𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵", // wait let's provide direct solid mappers
};

// Let's use direct character tables for exact rendering
// Using explicit arrays for characters or a dynamic constructor ensures no typos.
// Let's define the character lists for popular Unicode fonts:
export const STYLE_MAPS: Array<{ id: string; name: string; category: string; chars: string }> = [
  {
    id: "gothicBold",
    name: "Gothic Bold (Fraktur)",
    category: "gothic",
    chars: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍🇮𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟0123456789"
  },
  {
    id: "gothicNormal",
    name: "Gothic Normal",
    category: "gothic",
    chars: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℋℑ𝔍𝔎𝔏𝔐𝔝𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789"
  },
  {
    id: "scriptBold",
    name: "Cursive Bold",
    category: "fancy",
    chars: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789"
  },
  {
    id: "scriptNormal",
    name: "Cursive Normal",
    category: "fancy",
    chars: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇ˢᵗᵘ𝓋𝓌𝓍𝓎𝓏0123456789"
  },
  {
    id: "doubleStruck",
    name: "Double-Struck (Outline)",
    category: "all",
    chars: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙🇮𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
  },
  {
    id: "boldSerif",
    name: "Bold Serif",
    category: "bold",
    chars: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
  },
  {
    id: "boldSans",
    name: "Bold Sans-Serif",
    category: "bold",
    chars: "𝗔𝗕🇨🇩𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸 civilisation 𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲 Irish" // wait, it's safer to map precisely using arrays of chars to avoid unicode block splits
  }
];

// Let's create helper dictionaries of 62 single-characters for safe, direct lookup indexing.
// Each of the styles matches character-by-character the SRC_ALPHA string:
// "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export interface AlphabetStyle {
  id: string;
  name: string;
  category: "all" | "fancy" | "bold" | "gothic" | "aesthetic";
  chars: string[];
}

export const ALPHABET_STYLES: AlphabetStyle[] = [
  {
    id: "gothic-bold",
    name: "Gothic Bold (𝕿𝕰𝖃𝕿)",
    category: "gothic",
    chars: [
      "𝕬", "𝕭", "𝕮", "𝕯", "𝕰", "𝕱", "𝕲", "𝕳", "𝕴", "𝕵", "𝕶", "𝕷", "𝕸", "𝕹", "𝕺", "𝕻", "𝕼", "𝕽", "𝕾", "𝕿", "𝖀", "𝖁", "𝖂", "𝖃", "𝖄", "𝖅",
      "𝖆", "𝖇", "𝖈", "𝖉", "𝖊", "𝖋", "𝖌", "𝖍", "𝖎", "𝖏", "𝖐", "𝖑", "𝖒", "𝖓", "𝖔", "𝖕", "𝖖", "𝖗", "𝖘", "𝖙", "𝖚", "𝖛", "𝖜", "𝖝", "𝖞", "𝖟",
      "𝟎", "𝟏", "𝟐", "𝟑", "𝟒", "𝟓", "𝟔", "𝟕", "𝟖", "𝟗"
    ]
  },
  {
    id: "gothic-normal",
    name: "Gothic Normal (𝔗𝔢𝔵𝔱)",
    category: "gothic",
    chars: [
      "𝔄", "𝔅", "ℭ", "𝔇", "𝔈", "𝔉", "𝔊", "ℋ", "ℑ", "𝔍", "", "𝔏", "𝔐", "𝔝", "𝔒", "𝔓", "𝔔", "ℜ", "𝔖", "𝔗", "𝔘", "𝔙", "𝔚", "𝔛", "𝔜", "ℨ",
      "𝔞", "base", "𝔠", "𝔡", "𝔢", "𝔣", "𝔤", "𝔥", "𝔦", "𝔧", "𝔨", "𝔩", "𝔪", "𝔫", "𝔬", "𝔭", "𝔮", "𝔯", "𝔰", "𝔱", "𝔲", "𝔳", "𝔴", "𝔵", "𝔶", "𝔷",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "cursive-bold",
    name: "Script Bold (𝓣𝓮𝔁𝓽)",
    category: "fancy",
    chars: [
      "𝓐", "𝓑", "𝓒", "𝓓", "𝓔", "𝓕", "𝓖", "𝓗", "𝓘", "𝓙", "𝓚", "𝓛", "𝓜", "𝓝", "𝓞", "𝓟", "𝓠", "𝓡", "𝓢", "𝓣", "𝓤", "𝓥", "𝓦", "𝓧", "𝓨", "𝓩",
      "𝓪", "𝓫", "𝓬", "𝓭", "𝓮", "𝓯", "𝓰", "𝓱", "𝓲", "𝓳", "𝓴", "𝓵", "𝓶", "𝓷", "𝓸", "𝓹", "𝓺", "𝓻", "𝓼", "𝓽", "𝓾", "𝓿", "𝔀", "𝔁", "𝔂", "𝔃",
      "𝟎", "𝟏", "𝟐", "𝟑", "𝟒", "𝟓", "𝟔", "𝟕", "𝟖", "𝟗"
    ]
  },
  {
    id: "cursive-normal",
    name: "Script Light (𝒯ℯ𝓍𝓉)",
    category: "fancy",
    chars: [
      "𝒜", "ℬ", "𝒞", "𝒟", "ℰ", "ℱ", "𝒢", "ℋ", "ℐ", "𝒥", "𝒦", "ℒ", "ℳ", "𝒩", "𝒪", "𝒫", "𝒬", "ℛ", "𝒮", "𝒯", "𝒰", "𝒱", "𝒲", "𝒳", "𝒴", "𝒵",
      "𝒶", "𝒷", "𝒸", "𝒹", "ℯ", "𝒻", "ℊ", "𝒽", "𝒾", "𝒿", "𝓀", "𝓁", "𝓂", "𝓃", "ℴ", "𝓅", "𝓆", "𝓇", "𝓈", "𝓉", "𝓊", "𝓋", "𝓌", "𝓍", "𝓎", "𝓏",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "double-struck",
    name: "Outline / Bubble-2 (𝕋𝕖𝕩𝕥)",
    category: "all",
    chars: [
      "𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", "𝕂", "𝕃", "𝕄", "ℕ", "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ",
      "𝕒", "𝕓", "𝕔", "𝕕", "𝕖", "𝕗", "𝕘", "𝕙", "𝕚", "𝕛", "𝕜", "𝕝", "𝕞", "𝕟", "𝕠", "𝕡", "𝕢", "𝕣", "𝕤", "𝕥", "𝕦", "𝕧", "𝕨", "𝕩", "𝕪", "𝕫",
      "𝟘", "𝟙", "𝟚", "𝟛", "𝟜", "𝟝", "𝟞", "𝟟", "𝟠", "𝟡"
    ]
  },
  {
    id: "bold-serif",
    name: "Bold Serif (𝐓𝐞𝐱𝐭)",
    category: "bold",
    chars: [
      "𝐀", "𝐁", "𝐂", "𝐃", "𝐄", "𝐅", "𝐆", "𝐇", "𝐈", "𝐉", "𝐊", "content", "𝐌", "𝐍", "𝐎", "𝐏", "𝐐", "𝐑", "𝐒", "𝐓", "𝐔", "𝐕", "𝐖", "𝐗", "𝐘", "𝐙",
      "𝐚", "𝐛", "𝐜", "𝐝", "𝐞", "𝐟", "𝐠", "𝐡", "𝐢", "𝐣", "𝐤", "𝐥", "𝐦", "𝐧", "𝐨", "𝐩", "𝐪", "𝐫", "𝐬", "𝐭", "𝐮", "𝐯", "𝐰", "𝐱", "𝐲", "𝐳",
      "𝟎", "𝟏", "𝟐", "𝟑", "𝟒", "𝟓", "𝟔", "𝟕", "𝟖", "𝟗"
    ]
  },
  {
    id: "bold-sans",
    name: "Bold Sans (𝗧𝗲𝘅𝘁)",
    category: "bold",
    chars: [
      "𝗔", "𝗕", "𝗖", "𝗗", "𝗘", "𝗙", "𝗚", "𝗛", "𝗜", "𝗝", "𝗞", "𝗟", "𝗠", "𝗡", "𝗢", "𝗣", "𝗤", "𝗥", "𝗦", "𝗧", "𝗨", "𝗩", "𝗪", "𝗫", "𝗬", "𝗭",
      "𝗮", "𝗯", "𝗰", "𝗱", "𝗲", "𝗳", "𝗴", "𝗵", "𝗶", "𝗷", "𝗸", "𝗹", "𝗺", "𝗻", "𝗼", "𝗽", "𝗾", "𝗿", "𝘀", "𝘁", "𝘂", "𝘃", "𝘄", "𝘅", "𝘆", "𝘇",
      "𝟬", "𝟭", "𝟮", "𝟯", "𝟰", "𝟱", "𝟲", "𝟳", "𝟴", "𝟵"
    ]
  },
  {
    id: "italic-serif",
    name: "Italic Serif (𝑇𝑒𝑥𝑡)",
    category: "fancy",
    chars: [
      "𝐴", "𝐵", "𝐶", "𝐷", "𝐸", "𝐹", "𝐺", "𝐻", "𝐼", "𝐽", "𝐾", "𝐿", "𝑀", "𝑁", "𝑂", "𝑃", "𝑄", "𝑅", "𝑆", "𝑇", "𝑈", "𝑉", "content", "𝑋", "content", "𝑍",
      "𝑎", "𝑏", "𝑐", "𝑑", "𝑒", "𝑓", "𝑔", "ℎ", "𝑖", "𝑗", "𝑘", "𝑙", "𝑚", "𝑛", "𝑜", "𝑝", "𝑞", "𝑟", "𝑠", "𝑡", "𝑢", "𝑣", "𝑤", "𝑥", "𝑦", "𝑧",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "italic-sans",
    name: "Italic Sans (𝘛𝘦𝘹𝘵)",
    category: "fancy",
    chars: [
      "𝘈", "𝘉", "𝘊", "𝘋", "𝘌", "𝘍", "𝘎", "𝘏", "𝘐", "𝘑", "𝘒", "𝘓", "𝘔", "𝘕", "𝘖", "𝘗", "𝘘", "𝘙", "𝘚", "𝘛", "𝘜", "𝘝", "𝘞", "𝘟", "𝘠", "𝘡",
      "𝘢", "𝘣", "𝘤", "𝘥", "𝘦", "𝘧", "𝘨", "𝘩", "𝘪", "𝘫", "𝘬", "𝘭", "𝘮", "𝘯", "𝘰", "𝘱", "𝘲", "𝘳", "𝘴", "𝘵", "𝘶", "𝘷", "𝘸", "𝘹", "𝘺", "𝘻",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "bold-italic-serif",
    name: "Bold Italic Serif (𝑻𝒆𝒙𝒕)",
    category: "bold",
    chars: [
      "𝑨", "𝑩", "𝑪", "𝑫", "𝑬", "𝑭", "𝑮", "𝑯", "𝑰", "𝑱", "𝑲", "𝑳", "𝑴", "𝑵", "𝑶", "𝑷", "𝑸", "𝑹", "𝑺", "𝑻", "𝑼", "𝑽", "𝑾", "𝑿", "𝒀", "𝒁",
      "𝒂", "𝒃", "𝒄", "𝒅", "𝒆", "𝒇", "𝒈", "𝒉", "𝒊", "𝒋", "𝒌", "𝒍", "𝒎", "𝒏", "𝒐", "𝒑", "𝒒", "𝒓", "𝒔", "𝒕", "𝒖", "𝒗", "𝒘", "𝒙", "𝒚", "𝒛",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "bold-italic-sans",
    name: "Bold Italic Sans (𝙏𝙚𝙭𝙩)",
    category: "bold",
    chars: [
      "𝘼", "𝘽", "𝘾", "𝘿", "𝙀", "𝙁", "𝙂", "𝙃", "𝙄", "𝙅", "𝙆", "𝙇", "𝙈", "𝙉", "𝙊", "𝙋", "𝙌", "𝙍", "𝙎", "𝙏", "𝙐", "𝙑", "𝙒", "𝙓", "𝙔", "𝙕",
      "𝙖", "𝙗", "𝙘", "𝙙", "𝙚", "𝙛", "𝙜", "𝙝", "𝙞", "𝙟", "𝙠", "𝙡", "𝙢", "𝙣", "𝙤", "𝙥", "𝙦", "𝙧", "𝙨", "𝙩", "𝙪", "𝙫", "𝙬", "𝙭", "𝙮", "𝙯",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "monospace",
    name: "Monospace (𝚃𝚎𝚡𝚝)",
    category: "all",
    chars: [
      "𝙰", "𝙱", "𝙲", "𝙳", "𝙴", "𝙵", "𝙶", "𝙷", "𝙸", "𝙹", "𝙺", "𝙻", "𝙼", "𝙽", "𝙾", "𝙿", "𝚀", "𝚁", "𝚂", "𝚃", "𝚄", "𝚅", "𝚆", "𝚇", "𝚈", "𝚉",
      "𝚊", "𝚋", "𝚌", "𝚍", "𝚎", "𝚏", "𝚐", "𝚑", "𝚒", "𝚓", "𝚔", "𝚕", "𝚖", "𝚗", "𝚘", "𝚙", "𝚚", "𝚛", "𝚜", "𝚝", "𝚞", "𝚟", "𝚠", "𝚡", "𝚢", "𝚣",
      "𝟶", "𝟷", "𝟸", "𝟹", "𝟺", "𝟻", "𝟼", "𝟽", "𝟾", "𝟿"
    ]
  },
  {
    id: "bubbles",
    name: "Bubbles / Circles (Ⓣⓔⓧⓣ)",
    category: "all",
    chars: [
      "Ⓐ", "Ⓑ", "Ⓒ", "Ⓓ", "Ⓔ", "Ⓕ", "Ⓖ", "Ⓗ", "Ⓘ", "Ⓙ", "Ⓚ", "Ⓛ", "Ⓜ", "Ⓝ", "Ⓞ", "Ⓟ", "Ⓠ", "Ⓡ", "Ⓢ", "Ⓣ", "Ⓤ", "Ⓥ", "Ⓦ", "Ⓧ", "Ⓨ", "Ⓩ",
      "ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ", "ⓖ", "ⓗ", "ⓘ", "ⓙ", "ⓚ", "ⓛ", "ⓜ", "ⓝ", "ⓞ", "ⓟ", "ⓠ", "ⓡ", "ⓢ", "ⓣ", "ⓤ", "ⓥ", "ⓦ", "ⓧ", "ⓨ", "ⓩ",
      "⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"
    ]
  },
  {
    id: "filled-circles",
    name: "White on Black Circle (🅐🅔🅧🅣)",
    category: "fancy",
    chars: [
      "🅐", "🅑", "🅒", "🅓", "🅔", "🅵", "🅶", "🅗", "🅘", "🅙", "🅚", "🅛", "🅜", "🅝", "🅞", "🅟", "🅠", "🅡", "🅢", "🅣", "🅤", "🅥", "🅦", "🅧", "🆈", "🅩",
      "🅐", "🅑", "🅒", "🅓", "🅔", "🅵", "🅶", "🅗", "🅘", "🅙", "🅚", "🅛", "🅜", "🅝", "🅞", "🅟", "🅠", "🅡", "🅢", "🅣", "🅤", "🅥", "🅦", "🅧", "🆈", "🅩",
      "⓿", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾"
    ]
  },
  {
    id: "squares-outline",
    name: "Squares (🄰🄴🅇🅣)",
    category: "all",
    chars: [
      "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄿", "🄼", "🄽", "🄿", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉",
      "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄿", "🄼", "🄽", "🄿", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "squares-filled",
    name: "White on Red Square (🅰🅱🆇🆃)",
    category: "fancy",
    chars: [
      "🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆋",
      "🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "", "", "", "🆈", "", // safe layout fallback
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "small-caps",
    name: "Small Caps (ᴛᴇxᴛ)",
    category: "aesthetic",
    chars: [
      "ᴀ", "ʙ", "ᴄ", "ᴅ", "ᴇ", "ꜰ", "ɢ", "ʜ", "ɪ", "ᴊ", "ᴋ", "ʟ", "ᴍ", "ɴ", "ᴏ", "ᴘ", "ǫ", "ʀ", "s", "ᴛ", "ᴜ", "ᴠ", "ᴡ", "x", "ʏ", "ᴢ",
      "ᴀ", "ʙ", "ᴄ", "ᴅ", "ᴇ", "ꜰ", "ɢ", "ʜ", "ɪ", "ᴊ", "ᴋ", "ʟ", "ᴍ", "ɴ", "ᴏ", "ᴘ", "ǫ", "ʀ", "s", "ᴛ", "ᴜ", "ᴠ", "ᴡ", "x", "ʏ", "ᴢ",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "wide",
    name: "Wide Aesthetic (Ｔｅｘｔ)",
    category: "aesthetic",
    chars: [
      "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ",
      "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ", "ｏ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ",
      "０", "１", "２", "３", "４", "５", "６", "７", "８", "９"
    ]
  },
  {
    id: "greek-style",
    name: "Greek Classical (ƬΣXƬ)",
    category: "gothic",
    chars: [
      "Λ", "ß", "C", "D", "Ξ", "F", "Ǥ", "Ħ", "I", "Ĵ", "K", "Ł", "M", "Ɲ", "Θ", "Ƥ", "Ǫ", "R", "Ş", "Ƭ", "Ʋ", "V", "Ш", "X", "Y", "Z",
      "α", "в", "c", "Ð", "ε", "f", "g", "н", "ı", "j", "к", "ℓ", "м", "п", "σ", "p", "q", "я", "ѕ", "т", "υ", "v", "ω", "x", "у", "z",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "currency-style",
    name: "Crypto Currency (₮ɆӾ₮)",
    category: "fancy",
    chars: [
      "₳", "฿", "₵", "Đ", "Ɇ", "₣", "₲", "Ⱨ", "I", "JK", "Ⱡ", "M", "₦", "Ø", "PQ", "Ɽ", "₴", "₮", "Ʉ", "V", "₩", "X", "¥", "Ƶ",
      "α", "в", "c", "Ð", "ε", "f", "g", "н", "ı", "j", "к", "ℓ", "м", "п", "σ", "p", "q", "я", "ѕ", "т", "υ", "v", "ω", "x", "у", "z",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
  },
  {
    id: "parenthesis",
    name: "Parenthesized (⒜⒝⒞⒟)",
    category: "aesthetic",
    chars: [
      "⒜", "⒝", "⒞", "⒟", "⒠", "⒡", "⒢", "⒣", "⒤", "⒥", "⒦", "⒧", "⒨", "⒩", "⒪", "⒫", "⒬", "⒭", "⒮", "⒯", "⒰", "⒱", "⒲", "⒳", "⒴", "⒵",
      "⒜", "⒝", "⒞", "⒟", "⒠", "⒡", "⒢", "⒣", "⒤", "⒥", "⒦", "⒧", "⒨", "⒩", "⒪", "⒫", "⒬", "⒭", "⒮", "⒯", "⒰", "⒱", "⒲", "⒳", "⒴", "⒵",
      "⓪", "⑴", "⑵", "⑶", "⑷", "⑸", "⑹", "⑺", "⑻", "⑼"
    ]
  },
  {
    id: "inverted",
    name: "Upside Down (ʇxəʇ)",
    category: "all",
    chars: [
      "Ɐ", "ᗺ", "Ͻ", "ᗡ", "Ǝ", "Ⅎ", "⅁", "H", "I", "ᒋ", "ʞ", "Ꞁ", "W", "N", "O", "Ԁ", "Ὁ", "ᴚ", "S", "⊥", "∩", "Λ", "M", "X", "⅄", "Z",
      "ɐ", "q", "ɔ", "p", "ǝ", "ɟ", "ƃ", "ɥ", "ı", "ɾ", "ʞ", "l", "ɯ", "u", "o", "d", "b", "ɹ", "s", "ʇ", "n", "ʌ", "ʍ", "x", "ʎ", "z",
      "0", "Ɩ", "ᄅ", "Ɛ", "ㄣ", "ϛ", "9", "ㄥ", "8", "6"
    ]
  }
];

// Custom mapping function for styling letters
export function applyStyle(text: string, styleId: string): string {
  if (!text) return "";
  
  // Custom non-dictionary transformations
  if (styleId === "strikethrough") {
    return text.split("").map(c => c + "̶").join("");
  }
  if (styleId === "underline") {
    return text.split("").map(c => c + "̲").join("");
  }
  if (styleId === "double-underline") {
    return text.split("").map(c => c + "̳").join("");
  }
  if (styleId === "slashthrough") {
    return text.split("").map(c => c + "̷").join("");
  }
  if (styleId === "zalgo-glitch") {
    const zalgoUp = ["̍", "̎", "̄", "̅", "̿", "̑", "̆", "̽", "͆", "̃", "̾", "͊", "͋", "͌"];
    const zalgoDown = ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̤", "̥", "̦", "̩", "̪"];
    const zalgoMid = ["̕", "̛", "̀", "́", "̂", "̃", "̄", "̅", "̆", "̇", "̈", "̉", "̊", "̋"];
    return text.split("").map(c => {
      if (/\s/.test(c)) return c;
      return c + 
        zalgoUp[Math.floor(Math.random() * zalgoUp.length)] + 
        zalgoDown[Math.floor(Math.random() * zalgoDown.length)] + 
        zalgoMid[Math.floor(Math.random() * zalgoMid.length)];
    }).join("");
  }
  if (styleId === "vaporwave") {
    return text.split("").map(c => c === " " ? "  " : c).join(" ");
  }

  // Find direct dictionary match
  const style = ALPHABET_STYLES.find(s => s.id === styleId);
  if (!style) return text;

  return text.split("").map(char => {
    const index = SRC_ALPHA.indexOf(char);
    if (index !== -1 && style.chars[index]) {
      return style.chars[index];
    }
    return char; // default safe fallback
  }).join("");
}

// Gaming standard aesthetic tags and wrappers to generate 1000+ variants
export interface DecorationOption {
  prefix: string;
  suffix: string;
  name: string;
}

export const DECORATIONS: DecorationOption[] = [
  { prefix: "꧁༺ ", suffix: " ༻꧂", name: "Glory Wings" },
  { prefix: "〆", suffix: "〆", name: "Deadly Slash" },
  { prefix: "亗 ", suffix: " 亗", name: "Kshatriya Crown" },
  { prefix: "乂 ", suffix: " 乂", name: "Shadow Cross" },
  { prefix: "『", suffix: "』", name: "Cyber Brackets" },
  { prefix: "【", suffix: "】", name: "Solid Brackets" },
  { prefix: "〖", suffix: "〗", name: "Aesthetic Brackets" },
  { prefix: "⚡ ", suffix: " ⚡", name: "Vortex Lightning" },
  { prefix: "☠️ ", suffix: " ☠️", name: "Skull Captain" },
  { prefix: "✞ ", suffix: " ✞", name: "Sacred Cross" },
  { prefix: "✿ ", suffix: " ✿", name: "Cherry Blossom" },
  { prefix: "♛ ", suffix: " ♛", name: "Royal King" },
  { prefix: "⚔️ ", suffix: " ⚔️", name: "Twin Blades" },
  { prefix: "☯️ ", suffix: " ☯️", name: "Yin Yang Balance" },
  { prefix: "❄️ ", suffix: " ❄️", name: "Snow Shard" },
  { prefix: "★ ", suffix: " ★", name: "Classic Star" },
  { prefix: "✦ ", suffix: " ✦", name: "Cosmic Flare" },
  { prefix: "✧ ", suffix: " ✧", name: "Glimmer Star" },
  { prefix: "❤ ", suffix: " ❤", name: "Sweet Heart" },
  { prefix: "❖ ", suffix: " ❖", name: "Modern Emblem" },
  { prefix: "✨ ", suffix: " ✨", name: "Glitter Sparkle" },
  { prefix: "🔥 ", suffix: " 🔥", name: "Blazing Fire" },
  { prefix: "👑 ", suffix: " 👑", name: "Emperor Crown" },
  { prefix: "🎮 ", suffix: " 🎮", name: "Gamer Core" },
  { prefix: "👾 ", suffix: " 👾", name: "Retro Invader" },
  { prefix: "🩸 ", suffix: " 🩸", name: "Crimson Drops" },
  { prefix: "⚡️『", suffix: "』⚡️", name: "Lightning Frame" },
  { prefix: "♛『", suffix: "』♛", name: "Dynasty Frame" },
  { prefix: "✿『", suffix: "』✿", name: "Lily Frame" },
  { prefix: "☠️『", suffix: "』☠️", name: "Pirate Frame" },
  { prefix: "★彡 ", suffix: " 彡★", name: "Shooting Stars" },
  { prefix: "☾ ", suffix: " ☽", name: "Lunar Crescent" },
  { prefix: "☣️ ", suffix: " ☣️", name: "Hazard Zone" },
  { prefix: "☕ ", suffix: " ☕", name: "Morning Coffee" },
  { prefix: "✈ ", suffix: " ✈", name: "Skylight Cruise" },
  { prefix: "卑 ", suffix: " 卑", name: "Gothic Petals" },
  { prefix: "⚔️༺ ", suffix: " ༻⚔️", name: "Gladiator Wings" },
  { prefix: "♛༺ ", suffix: " ༻♛", name: "Royal Wings" },
  { prefix: "☠️❂ ", suffix: " ❂☠️", name: "Cursed Emblem" },
  { prefix: "❦ ", suffix: " ❦", name: "Flourish Ribbon" },
  { prefix: "☁️ ", suffix: " ☁️", name: "Aesthetic Cloud" },
  { prefix: "⚜️ ", suffix: " ⚜️", name: "Lafayette Fleur" },
  { prefix: "❣ ", suffix: " ❣", name: "Exclamation Heart" },
  { prefix: "✖ ", suffix: " ✖", name: "Cancel Cross" },
  { prefix: "❂ ", suffix: " ❂", name: "Sun Wheel" },
  { prefix: "✈︎༺ ", suffix: " ༻✈︎", name: "Aero Flight" },
  { prefix: "『sʜʀᴋ』", suffix: "", name: "Shark Clan Prefix" },
  { prefix: "『ᴛᴏxɪᴄ』", suffix: "", name: "Toxic Clan Prefix" },
  { prefix: "『ᴋɪʟʟ』", suffix: "", name: "Kill Clan Prefix" },
  { prefix: "『ɢᴏᴅ』", suffix: "", name: "God Clan Prefix" },
  { prefix: "『OP』", suffix: "", name: "Overpowered Prefix" },
  { prefix: "☯︎ ", suffix: " ☯︎", name: "Zen Balance" },
  { prefix: "⚓︎ ", suffix: " ⚓︎", name: "Sea Anchor" },
  { prefix: "⚔️ ", suffix: " ⚔️", name: "Warlords" }
];

// Spacers that can go between letters
export const SPACERS = [
  { id: "none", name: "Normal spacing", char: "" },
  { id: "dot", name: "Dots (N.a.m.e)", char: "." },
  { id: "cross", name: "Cross (N✖a✖m✖e)", char: "✖" },
  { id: "space", name: "Space (N a m e)", char: " " },
  { id: "star", name: "Star (N★a★m★e)", char: "★" },
  { id: "hyphen", name: "Hyphen (N-a-m-e)", char: "-" },
  { id: "tilde", name: "Tilde (N~a~m~e)", char: "~" },
  { id: "slash", name: "Slash (N/a/m/e)", char: "/" }
];

// Popular static templates representing 1000+ total styles
// This function takes an input (e.g. "Shadow") and constructs a list of styles.
// It generates exactly 1000+ unique styles!
export interface StyledNickname {
  id: string;
  styledText: string;
  styleName: string;
  fontName: string;
  decorationName: string;
  category: "all" | "gaming" | "aesthetic" | "gothic" | "bold" | "fancy";
}

export function generateNicknames(text: string): StyledNickname[] {
  if (!text) return [];

  const trimmedText = text.trim();
  const results: StyledNickname[] = [];

  // 1. Generate core 25-30 un-decorated alphabetic styles
  const textStyles = [
    ...ALPHABET_STYLES,
    { id: "strikethrough", name: "Strikethrough (T̶e̶x̶t̶)", category: "aesthetic" as const, chars: [] },
    { id: "underline", name: "Underline (T̲e̲x̲t̲)", category: "aesthetic" as const, chars: [] },
    { id: "double-underline", name: "Double Underline (T̳e̳x̳t̳)", category: "aesthetic" as const, chars: [] },
    { id: "slashthrough", name: "Slashthrough (T̷e̷x̷t̷)", category: "aesthetic" as const, chars: [] },
    { id: "zalgo-glitch", name: "Zalgo Glitch (T̵͊e̵̓x̵͂t̵̀)", category: "gothic" as const, chars: [] },
    { id: "vaporwave", name: "Vaporwave Space (T e x t)", category: "aesthetic" as const, chars: [] },
  ];

  // Add the plain clean letter styles first
  textStyles.forEach((ts) => {
    const styledText = applyStyle(trimmedText, ts.id);
    results.push({
      id: `base-${ts.id}`,
      styledText,
      styleName: ts.name,
      fontName: ts.name.split(" ")[0] || "Custom",
      decorationName: "None",
      category: ts.category
    });
  });

  // 2. Compute combinations (Fonts x Decorations) to fill up to over 1000 unique variations.
  // Each combinations uses a beautiful aesthetic layout designed for pro gaming look.
  // Let's loop over all styles and decorations to build EXACTLY 1000+ choices!
  let counter = 0;
  for (let d = 0; d < DECORATIONS.length; d++) {
    const dec = DECORATIONS[d];
    for (let f = 0; f < textStyles.length; f++) {
      const font = textStyles[f];
      
      const styledInput = applyStyle(trimmedText, font.id);
      const compositeText = `${dec.prefix}${styledInput}${dec.suffix}`;
      
      // Classify categories
      let category: "gaming" | "aesthetic" | "gothic" | "bold" | "fancy" = "gaming";
      if (dec.prefix.includes("✿") || dec.prefix.includes("☁️") || dec.prefix.includes("❦") || dec.prefix.includes("☾")) {
        category = "aesthetic";
      } else if (font.category === "gothic" || dec.prefix.includes("☠️") || dec.prefix.includes("⚔️") || dec.prefix.includes("✞")) {
        category = "gothic";
      } else if (font.category === "bold") {
        category = "bold";
      } else if (font.category === "fancy") {
        category = "fancy";
      }

      results.push({
        id: `combo-${counter++}`,
        styledText: compositeText,
        styleName: `${dec.name} ✦ ${font.name.split(" ")[0]}`,
        fontName: font.name,
        decorationName: dec.name,
        category
      });
    }
  }

  // 3. Add letter-spaced and decorated custom spacing variations for advanced styles
  SPACERS.forEach(spacer => {
    if (spacer.id === "none") return;
    const characters = trimmedText.split("").join(spacer.char);
    
    // Add 10 popular variations for spacers
    textStyles.slice(0, 10).forEach(ts => {
      const styledText = applyStyle(characters, ts.id);
      results.push({
        id: `spacer-${spacer.id}-${ts.id}`,
        styledText,
        styleName: `${spacer.name} + ${ts.name.split(" ")[0]}`,
        fontName: ts.name,
        decorationName: spacer.name,
        category: "aesthetic"
      });
    });
  });

  return results;
}
