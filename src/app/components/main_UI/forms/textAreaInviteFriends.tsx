import React, { useState, useRef, KeyboardEvent } from 'react';

interface CustomTextareaFieldProps {
  input: {
    value: string;
    onChange: (value: string) => void;
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  };
  meta: {
    error?: string;
    touched?: boolean;
  };
  label: string;
  className?: string;
  placeholder?: string;
  emailList: string[];
  updateEmailList: (newList: string[]) => void;
}

const TextAreaInviteFriends: React.FC<CustomTextareaFieldProps> = ({
  input,
  meta,
  label,
  className = '',
  placeholder = '',
  emailList,
  updateEmailList,
}) => {
  const [typedEmail, setTypedEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addEmailToList = (email: string) => {
    if (isEmailValid(email) && emailList.length < 10 && !emailList.includes(email)) {
      updateEmailList([...emailList, email]);
      setTypedEmail('');
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTypedEmail(e.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const trimmedEmail = typedEmail.trim();
    if (trimmedEmail && (e.key === 'Enter' || e.key === ',' || e.key === ' ')) {
      e.preventDefault();
      addEmailToList(trimmedEmail);
    }
  };

  const removeEmail = (emailToRemove: string) => {
    updateEmailList(emailList.filter(email => email !== emailToRemove));
    input.onChange(emailList.filter(email => email !== emailToRemove).join(', '));
  };

  const renderEmailPills = () =>
    emailList.map((email, index) => (
      <span
        key={index}
        className="bg-primary text-black text-sm rounded-full px-4 py-1 text-black mr-2 mb-2 inline-flex items-center"
      >
        {email}
        <button
          type="button"
          onClick={() => removeEmail(email)}
          className="ml-2 text-black text-md"
        >
          ×
        </button>
      </span>
    ));

  return (
    <div className="relative">
      <div
        className={`custom-textarea-group flex flex-col items-center border border-gray-900 bg-default-100 rounded-xl shadow-sm ${className}`}
      >
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          className={`w-full h-32 text-md px-4 pt-8 text-white bg-transparent text-foreground-500 focus:outline-none focus-visible:outline-none border-none rounded-xl focus:ring-2 focus:ring-white custom-textarea`}
          aria-label={label}
          value={typedEmail}
          onChange={handleTextareaChange}
          onKeyUp={handleKeyUp}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <label
          className={`absolute top-7 left-4 text-zinc-400 text-md transition-all duration-500 pointer-events-none custom-label ${
            isFocused || emailList.length ? 'text-xs -translate-y-.5' : 'translate-y-0.5'
          }`}
        >
          {label}
        </label>
      </div>
      {meta.error && meta.touched && (
        <span className="text-xs text-zinc-500 mt-2">{meta.error}</span>
      )}
      <div className="flex flex-wrap mb-2 mr-2 items-center">{renderEmailPills()}</div>
    </div>
  );
};

export default TextAreaInviteFriends;
