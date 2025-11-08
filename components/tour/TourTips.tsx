type Props = {
  tips?: string;
};

export default function TourTips({ tips }: Props) {
  if (!tips?.length) return <p>No travel tips currently available.</p>;

  return (
    <div
      className="tour-tips-container"
      dangerouslySetInnerHTML={{ __html: tips }}
    />
  );
}