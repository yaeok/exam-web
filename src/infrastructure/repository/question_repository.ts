import { Question } from '@/domain/entity/question_entity'
import { QuestionRepository } from '@/domain/repository/question_repository'
import { QuestionDTO } from '@/infrastructure/dto/question/question_dto'
import { db, master } from '@/infrastructure/firestore/config'
import { QuestionMapper } from '@/infrastructure/mapper/question_mapper'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  setDoc,
} from '@firebase/firestore'

export class IQuestionRepository implements QuestionRepository {
  getQuestionByQid(args: {
    qid: string
    eid: string
  }): Promise<Question | null> {
    const docRef = doc(db, master, 'questions', args.qid)
    return new Promise<Question | null>((resolve, reject) => {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            const questionData: DocumentData = doc.data()
            const question = QuestionMapper.toDomain(
              QuestionDTO.fromDoc(questionData)
            )
            resolve(question)
          } else {
            resolve(null)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  regQuestion(args: { question: Question; eid: string }): Promise<Question> {
    const colRef = collection(db, master, 'exams', args.eid, 'questions')
    const question = QuestionDTO.fromEntity(args.question).toData()
    return new Promise<Question>((resolve, reject) => {
      addDoc(colRef, question)
        .then((docRef) => {
          const qid = docRef.id
          const question = QuestionMapper.toDomain(
            QuestionDTO.fromEntity(args.question)
          )
          question.qid = qid
          // qidの更新
          setDoc(docRef, { qid: qid }, { merge: true })
          resolve(question)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  updQuestion(args: { question: Question; eid: string }): Promise<Question> {
    throw new Error('Method not implemented.')
  }
}
