import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../../components/firebase'

export const saveData = async (question, option1, option2, option3, answer) => {
  return await addDoc(collection(db, 'questions'), {
    question,
    choises: [
      option1,
      option2,
      option3
    ],
    answer
  })
}

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'))
  const questions = querySnapshot.docs.map(doc => doc.data())
  return questions
}
