import "./Pagination.styles.css";

export function Pagination(props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPost / props.postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="navigation">
        {pageNumbers.map((number) => (
          <li key={number} className="navigation__item">
            <button
              className="navigation__item__link"
              onClick={() => props.onClick(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
