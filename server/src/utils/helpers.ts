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
