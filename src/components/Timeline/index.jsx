export default function Timeline({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export function TimelineItem({ item }) {
  return (
    <li key={item.id}>
      <h4>{item.start}</h4>
      <p>{item.end}</p>
    </li>
  );
}