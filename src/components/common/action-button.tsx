type ActionButtonProps = {
  label: string;
  onClick: () => void;
};

export function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <button
      className="appearance-nonce text-white bg-orange-500 w-fit rounded-lg p-4"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
