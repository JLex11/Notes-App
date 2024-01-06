import { motion } from 'framer-motion'
import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNotes } from '../hooks/useNotes'
import styles from '../styles/Notes.module.css'
import Note from './Note'

const Notes = () => {
  const notesF = useNotes()
  useEffect(() => notesF.init(), []) // eslint-disable-line react-hooks/exhaustive-deps

  const notes = useSelector(state => state.notes)
  const filterSelected = useSelector(state => state.filter.selected)
  const filterOrder = useSelector(state => state.filter.order)
  const searchWord = useSelector(state => state.filter.search)

  const sortCondition = useCallback((a, b, noteKey = 'date', increment = 'desc') => {
    if (a[noteKey] > b[noteKey]) return increment === 'desc' ? -1 : 1
    if (a[noteKey] < b[noteKey]) return increment === 'desc' ? 1 : -1
    return 0
  }, [])

  const filteredNotes = useCallback((notes, searchWord) => {
    if (!searchWord) return notes
    const pattern = new RegExp(searchWord, 'i')
    return notes.filter(note => pattern.test(note.content))
  }, [])

  return (
    <motion.ul className={styles.Notes} layout>
      {filteredNotes(notes, searchWord)
        .sort((a, b) => sortCondition(a, b, filterSelected, filterOrder))
        .map(note => (
          <Note key={note.id} note={note} />
        ))}
    </motion.ul>
  )
}

export default memo(Notes)
