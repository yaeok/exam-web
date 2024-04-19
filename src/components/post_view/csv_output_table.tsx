import React from 'react'

import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@/design'
import { Question } from '@/domain/entity/question_entity'

type CsvTableProps = {
  lstQuestionInfo: Question[]
}

export default function CsvTable(props: CsvTableProps) {
  const questionIndex: number = 4
  return props.lstQuestionInfo.length > 0 ? (
    <Table>
      <Thead>
        <Tr>
          <Th>問題</Th>
          {(function () {
            for (let i = 0; i < questionIndex; i++) {
              return <Th>選択肢{i}</Th>
            }
          })()}
          <Th>正答</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.lstQuestionInfo.map((question, index) => (
          <Tr key={index}>
            <Td>
              <Text>{question.question}</Text>
            </Td>
            <Td>
              <Text>
                {question.lstSelect.map((select, index) => (
                  <Text key={index}>{select}</Text>
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
  ) : null
}
