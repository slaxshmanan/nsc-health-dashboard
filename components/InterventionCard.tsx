type Props = {
  intervention: string;
};

export default function InterventionCard({ intervention }: Props) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <p>{intervention}</p>
    </div>
  );
}