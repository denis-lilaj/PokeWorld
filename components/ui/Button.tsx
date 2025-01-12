interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className }) => (
  <button
    onClick={onClick}
    className={`w-full sm:w-auto bg-primary text-white hover:bg-secondary hover:text-black focus:ring-2 focus:ring-secondary rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${className}`}
  >
    {text}
  </button>
);

export default Button;
