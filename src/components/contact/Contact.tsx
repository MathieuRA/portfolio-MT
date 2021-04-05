import {
  ChangeEventHandler,
  createRef,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import Container from '../../Container'

import {
  blockScroll,
  formIsValid,
  isValidAntispam,
  isValidInput,
} from '../../utils'

import './contact.css'

const Contact: FC = ({}) => {
  const form = createRef<HTMLFormElement>()
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [subject, setSubject] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [validForm, setValidForm] = useState(false)

  useEffect(() => {
    Container.disableSmoothScrool()

    return () => {
      Container.enableSmoothScrool()
    }
  }, [])

  const _checkNameValidity: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { currentTarget } = e
    if (
      isValidInput(currentTarget, 'text', {
        max: 40,
        min: 2,
      })
    ) {
      setName(currentTarget.value)
    }
  }
  const _checkMailValidity: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { currentTarget } = e
    if (
      isValidInput(currentTarget, 'email', {
        max: 50,
        min: 5,
      })
    ) {
      setEmail(currentTarget.value)
    }
  }

  const _checkSubjectValidity: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { currentTarget } = e
    if (
      isValidInput(currentTarget, 'text', {
        max: 30,
        min: 3,
      })
    ) {
      setSubject(currentTarget.value)
    }
  }

  const _checkTextareaValidity: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { currentTarget } = e
    if (
      isValidInput(currentTarget, 'text', {
        max: 300,
        min: 10,
      })
    ) {
      setMessage(currentTarget.value)
    }
  }

  const _formIsValid: ChangeEventHandler<HTMLFormElement> = (
    e
  ) => {
    if (!formIsValid(e.currentTarget)) {
      setValidForm(false)
      return
    }
    setValidForm(true)
  }

  const _checkAntispam: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    isValidAntispam(e.currentTarget, 2)
  }

  const _submitForm: FormEventHandler = (e) => {
    e.preventDefault()
  }

  return (
    <section id='contact'>
      <form
        ref={form}
        onChange={_formIsValid}
        onSubmit={_submitForm}
      >
        <div>
          <label htmlFor='name'>Nom</label>
          <input
            name='name'
            onChange={_checkNameValidity}
            onBlur={_checkNameValidity}
            type='text'
            maxLength={40}
            minLength={2}
            required
          />
        </div>
        <div>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            onChange={_checkMailValidity}
            onBlur={_checkMailValidity}
            maxLength={50}
            minLength={5}
            required
          />
        </div>
        <div>
          <label htmlFor=''>Sujet</label>
          <input
            type='text'
            maxLength={30}
            minLength={3}
            onBlur={_checkSubjectValidity}
            onChange={_checkSubjectValidity}
            required
          />
        </div>
        <div>
          <label htmlFor=''>Message</label>
          <textarea
            onChange={_checkTextareaValidity}
            onBlur={_checkTextareaValidity}
            maxLength={300}
            minLength={10}
            required
          />
        </div>
        <div>
          <label htmlFor=''>Anti-spam</label>
          <input
            type='number'
            placeholder='1 + 1'
            onChange={_checkAntispam}
            onBlur={_checkAntispam}
            required
          />
        </div>
        <small>
          * Les caractères spéciaux ne sont pas autorisés
        </small>
        {validForm && <button>Envoyer</button>}
      </form>
    </section>
  )
}
export default Contact
