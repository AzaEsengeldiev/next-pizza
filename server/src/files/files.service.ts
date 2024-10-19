import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new HttpException(
          "Неподдерживаемый формат файла",
          HttpStatus.BAD_REQUEST
        );
      }

      const fileName = `${uuid.v4()}${path.extname(file.originalname)}`;
      const filePath = path.resolve(__dirname, "..", "static");

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      console.error("Ошибка при записи файла:", e);
      throw new HttpException(
        "Произошла ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
