import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import Container from '../../Container'

import {
  formIsValid,
  isValidAntispam,
  isValidInput,
} from '../../utils'
import Spinner from '../spinner/Spinner'

import './contact.css'

const Contact: FC = () => {
  const form = useRef<HTMLFormElement>(null)
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [subject, setSubject] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [requestSend, setRequestSend] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [error, setError] =
    useState<string | undefined>(undefined)
  const [success, setSuccess] =
    useState<string | undefined>(undefined)

  const isMobile = window.innerWidth <= 1024

  useEffect(() => {
    Container.disableSmoothScrool()
    return () => {
      Container.enableSmoothScrool()
    }
  }, [])

  const _checkNameValidity: ChangeEventHandler<HTMLInputElement> =
    (e) => {
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
  const _checkMailValidity: ChangeEventHandler<HTMLInputElement> =
    (e) => {
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

  const _checkSubjectValidity: ChangeEventHandler<HTMLInputElement> =
    (e) => {
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

  const _checkTextareaValidity: ChangeEventHandler<HTMLTextAreaElement> =
    (e) => {
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

  const _formIsValid: ChangeEventHandler<HTMLFormElement> =
    (e) => {
      if (!formIsValid(e.currentTarget)) {
        setValidForm(false)
        return
      }
      setValidForm(true)
    }

  const _checkAntispam: ChangeEventHandler<HTMLInputElement> =
    (e) => {
      isValidAntispam(e.currentTarget, 2)
    }

  const _submitForm: FormEventHandler = async (e) => {
    e.preventDefault()
    if (requestSend) {
      return null
    }

    try {
      setRequestSend(true)
      await fetch('https://nexio-films.fr/mail', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      })
      form.current?.reset()
      setError(undefined)
      setSuccess('E-mail arriver à destination !')
      setName(undefined)
      setEmail(undefined)
      setSubject(undefined)
      setMessage(undefined)
    } catch (error) {
      setSuccess(undefined)
      setError(
        "L'email n'a pas été envoyé correctement. Veuillez réessayer ultérieurement"
      )
    }
    setRequestSend(false)
  }

  return (
    <section id='contact'>
      <form
        ref={form}
        onChange={_formIsValid}
        onSubmit={_submitForm}
        style={{
          height: 'calc(100vh - 85px)',
          width: isMobile ? '90%' : '80%',
        }}
      >
        {error !== undefined && (
          <p
            style={{
              backgroundColor: '#ff9090',
              padding: 10,
            }}
          >
            {error}
          </p>
        )}
        {success !== undefined && (
          <p
            style={{
              backgroundColor: '#95e69e',
              padding: 10,
            }}
          >
            {success}
          </p>
        )}
        <div
          style={{
            marginBottom: isMobile ? 15 : '',
          }}
        >
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
        {validForm && (
          <button>
            Envoyer {requestSend && <Spinner />}
          </button>
        )}
      </form>
    </section>
  )
}
export default Contact
