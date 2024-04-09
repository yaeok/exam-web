import { DataTransferObject } from '@/infrastructure/dto/dto'

export class QuestionDTO implements DataTransferObject {
  toData(): { [name: string]: any } {
    throw new Error('Method not implemented.')
  }
}
