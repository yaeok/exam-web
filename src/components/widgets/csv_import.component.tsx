import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { readString } from 'react-papaparse'

import { Box, Text } from '@/design'
import { db, master } from '@/infrastructure/firestore/config'
import { doc, setDoc } from '@firebase/firestore'

const CsvImport = () => {
  // CSVをドロップしたときに呼び出される処理
  const onDrop = useCallback((acceptedFiles: any) => {
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
  }, [])

  const handleFileRead = (binaryStr: string | ArrayBuffer | null) => {
    if (typeof binaryStr !== 'string') return
    readString(binaryStr, {
      worker: true,
      complete: async (results: any) => {
        // FirestoreにCSVデータを保存する処理 (results.dataは配列になったCSVデータ)
        for (let i = 1; i < results.data.length; i++) {
          // CSVデータの1列目をドキュメントIDとして指定
          const docRef = doc(db, master, 'subject', results.data[i][0])
          // CSVデータの2列目をドキュメントのnameフィールドに指定してFirestoreに保存
          await setDoc(docRef, {
            name: results.data[i][1],
          })
        }
      },
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className='App'>
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
      </div>
    </div>
  )
}

export default CsvImport
