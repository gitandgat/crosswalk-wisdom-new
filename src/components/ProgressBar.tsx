interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
    <div
      className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);
export default ProgressBar;
