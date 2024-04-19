import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { readString } from 'react-papaparse'

import { Text, VStack } from '@/design'
import { Question } from '@/domain/entity/question_entity'

type CsvImportProps = {
  roadCsv: (value: Question[]) => void
}

export default function CsvImportForm(props: CsvImportProps) {
  const questionIndex: number = 4
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // CSVをドロップしたときに呼び出される処理
  const onDrop = useCallback((acceptedFiles: any) => {
    setIsLoading(true)
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        // CSVのデータをコンソールに表示する
        console.log(binaryStr)
        handleFileRead(binaryStr)
      }
      reader.readAsText(file)
    })
    setIsLoading(false)
  }, [])

  const handleFileRead = (binaryStr: string | ArrayBuffer | null) => {
    if (typeof binaryStr !== 'string') return
    readString(binaryStr, {
      worker: true,
      complete: (results: any) => {
        const questions: Question[] = []
        console.log(results.data.length)
        for (let i: number = 1; i < results.data.length - 1; i++) {
          const data = results.data[i]
          console.log(data)
          const lstSelect: string[] = []
          // 選択肢は3列目から始まるため、3列目からループを回す
          for (let j: number = 3; j < 3 + questionIndex; j++) {
            if (data[j] === '') break
            lstSelect.push(data[j])
          }

          const question: Question = new Question({
            qid: '',
            question: data[1],
            lstSelect: lstSelect,
            answer: parseInt(data[2]),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          })
          questions.push(question)
        }
        props.roadCsv(questions)
      },
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return isLoading ? (
    <div>読み込み中...</div>
  ) : (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <VStack width='100%' border='dashed 1px' borderRadius='15' padding='10'>
          <Text>ファイルをここにドラッグアンドドロップするか、</Text>
          <Text>クリックしてファイルを選択してください</Text>
        </VStack>
      )}
    </div>
  )
}
