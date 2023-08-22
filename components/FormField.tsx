type Props = {
    type?: string;
    title: string;
    state: string;
    placeHolder: string;
    isTextArea?: boolean;
    setState: (value: string) => void; 

}

const FormField = ({ type, title, state, placeHolder, isTextArea, setState }: Props) => {
  return (
    <div className='flexStart flex-col w-full gap-4'>
        <label className='w-full text-gray-100'>
            {title}
        </label>

        {isTextArea ? (
            <textarea 
                placeholder={placeHolder}
                value={state}
                required
                className='form_field-input'
                onChange={(e) => setState(e.target.value)}
            />
        ) : (
            <input 
                type={type || 'text'}
                placeholder={placeHolder}
                value={state}
                required
                className='form_field-input'
                onChange={(e) => setState(e.target.value)}
            />
        )}
    </div>
  )
}

export default FormField