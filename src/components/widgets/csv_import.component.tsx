import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { readString } from 'react-papaparse'

import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@/design'
import { Question, Select } from '@/domain/entity/question_entity'

type CsvImportProps = {
  eid: string
  uid: string
}

export default function CsvImport() {
  const [lstQuestionState, setlstQuestionState] = useState<Question[]>([])
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
          const lstSelect: Select[] = []
          for (let j: number = 3; j < 3 + questionIndex; j++) {
            if (data[j] === '') break

            let index: number = 0
            const select: Select = new Select({
              value: index,
              label: data[j],
            })
            lstSelect.push(select)
            index++
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
        setlstQuestionState(questions)
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
        <Box border='dashed 1px black' rounded='base'>
          ファイルをここにドラッグアンドドロップするか、
          クリックしてファイルを選択してください
        </Box>
      )}
      {lstQuestionState.length > 0 ? (
        <Table>
          <Thead>
            <Tr>
              <Th>問題</Th>
              <Th>選択肢</Th>
              <Th>正答</Th>
            </Tr>
          </Thead>
          <Tbody>
            {lstQuestionState.map((question, index) => (
              <Tr key={index}>
                <Td>
                  <Text>{question.question}</Text>
                </Td>
                <Td>
                  <Text>
                    {question.lstSelect.map((select, index) => (
                      <Text key={index}>{select.label}</Text>
                    ))}
                  </Text>
                </Td>
                <Td>
                  <Text>{question.answer}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : null}
    </div>
  )
}
