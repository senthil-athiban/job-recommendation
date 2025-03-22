import * as cheerio from 'cheerio';

export const getFileExtension = (file: Express.Multer.File) => {
  if (file.mimetype === "application/pdf") {
    return "pdf";
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "docx";
  }
};

export const cleanHtml = (html:any) => {
    if (!html) return '';
    
    try {
      let fixedHtml = html
        .replace(/&amp;/g, '&')
        .replace(/â€™/g, "'")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â/g, "'")
        .replace(/â/g, '-')
        .replace(/â€¦/g, '...');
      
      const $ = cheerio.load(fixedHtml, {decodeEntities: true});
    
      $('h1, h2, h3, h4, h5, h6').each(function(this: any) {
        const $heading = $(this);
        const text = $heading.text().trim();
        $heading.replaceWith(`\n\n${text.toUpperCase()}\n\n`);
      });
      
      $('ul, ol').each(function(this: any) {
        const $list = $(this);
        $list.find('li').each(function(this: any) {
          const $item = $(this);
          $item.prepend('\n• ');
        });
        $list.append('\n\n');
      });
      
      $('p').each(function(this: any) {
        const $p = $(this);
        $p.append('\n\n');
      });
      
      $('br').replaceWith('\n');
      
      //@ts-ignore
      let text = $.text();
      
      text = text
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\s{2,}/g, ' ')
        .trim();
      
      text = text.replace(/Please mention the word \*\*[A-Z]+\*\* and tag [A-Za-z0-9+\/=]+ when applying to show you read the job post completely \(#[A-Za-z0-9+\/=]+\)\..*$/, '');
      
      return text;
    } catch (error:any) {
      console.error('Error cleaning HTML:', error.message);
      return html
        .replace(/<[^>]*>/g, ' ')  
        .replace(/&amp;/g, '&')    
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s{2,}/g, ' ')   
        .replace(/Please mention the word \*\*[A-Z]+\*\* and tag [A-Za-z0-9+\/=]+ when applying to show you read the job post completely \(#[A-Za-z0-9+\/=]+\)\..*$/, '') // Remove spam prevention text
        .trim();
    }
}