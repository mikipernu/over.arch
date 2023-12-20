import React, { forwardRef } from 'react';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Button>(
  ({ disabled, loading, ...rest}, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        disabled={disabled || loading}
        className="inline-block shrink-0 rounded-md border border-chat-blue bg-chat-blue px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-chat-blue focus:outline-none focus:ring active:text-chat-blue"
      />
    )
  }
);

Button.displayName = 'Button';

export default Button;