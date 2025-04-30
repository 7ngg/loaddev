export interface ProgressProps {
  isCompleted: boolean;
}

export default function ProgressIndicator(props: ProgressProps) {
  return (
    <div
      className={`w-[14px] h-[14px] rounded-full border 
      border-stone-950 ${props.isCompleted ? "bg-gray-600" : ""}`}
    />
  );
}
