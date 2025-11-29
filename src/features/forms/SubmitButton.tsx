interface SubmitButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export default function SubmitButton({
  disabled = false,
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
