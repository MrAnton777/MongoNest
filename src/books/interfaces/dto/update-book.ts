import { CreateBookDto } from "./create-book";

export interface UpdateBookDto extends Partial<CreateBookDto> {}