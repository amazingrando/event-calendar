import 'css-doodle';

function Doodle() {
  return (
    <css-doodle>{`
      :doodle {
        @grid: 2 / 200px;
        grid: 1px;
      }
      background: @pick(red, pink);
    `}</css-doodle>
  );
}

export default Doodle;
