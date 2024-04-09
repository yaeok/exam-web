import { Exam } from '@/domain/entity/exam_entity'
import { ExamRepository } from '@/domain/repository/exam_repository'
import { ExamDTO } from '@/infrastructure/dto/exam/exam_dto'
import { db, master } from '@/infrastructure/firestore/config'
import { ExamMapper } from '@/infrastructure/mapper/exam_mapper'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

export class IExamRepository implements ExamRepository {
  getExamById(args: { eid: string }): Promise<Exam | null> {
    const docRef = doc(db, master, 'exams', args.eid)
    return new Promise<Exam | null>((resolve, reject) => {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            const examData = doc.data()
            const exam = ExamMapper.toDomain(ExamDTO.fromDoc(examData))
            resolve(exam)
          } else {
            resolve(null)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  getAllExams(args: { uid: string }): Promise<Exam[]> {
    const colRef = collection(db, master, 'exams')
    const q = query(colRef, where('ownerId', '==', args.uid))
    return new Promise<Exam[]>((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          const exams: Exam[] = []
          snapshot.forEach((doc) => {
            const examData = doc.data()
            const exam = ExamMapper.toDomain(ExamDTO.fromDoc(examData))
            exams.push(exam)
            exams.push(exam)
            exams.push(exam)
            exams.push(exam)
          })
          resolve(exams)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  createExam(args: { exam: Exam }): Promise<Exam> {
    const colRef = collection(db, master, 'exams')
    const exam = ExamDTO.fromEntity(args.exam).toData()
    return new Promise<Exam>((resolve, reject) => {
      addDoc(colRef, exam)
        .then(() => {
          resolve(args.exam)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  updateExam(args: { exam: Exam }): Promise<Exam> {
    const docRef = doc(db, master, 'exams', args.exam.eid)
    const exam = ExamDTO.fromEntity(args.exam).toData()
    return new Promise<Exam>((resolve, reject) => {
      updateDoc(docRef, exam)
        .then(() => {
          resolve(args.exam)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  deleteExam(args: { eid: string }): Promise<boolean> {
    const docRef = doc(db, master, 'exams', args.eid)
    return new Promise<boolean>((resolve, reject) => {
      updateDoc(docRef, {
        deletedAt: new Date(),
      })
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
