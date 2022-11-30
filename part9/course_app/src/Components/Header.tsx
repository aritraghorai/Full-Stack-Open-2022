interface propType {
  name: string;
}

export default function Header({ name }: propType) {
  return <h1>{name}</h1>;
}
