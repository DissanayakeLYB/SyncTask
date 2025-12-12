interface Task {
  title: string;
  deadline: string;
}

export default function Task({ title, deadline }: Task) {
  return (
    <div className="border border-gray-300 p-2 my-2 rounded-md bg-white shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">Deadline: {deadline}</p>
    </div>
  );
}
