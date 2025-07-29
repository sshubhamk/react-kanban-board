const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div style={{
    width: '100%',
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'flex-end',
  }}>
    <input
      style={{ width: '25%' }}
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder='Search for cards with title or description'
    />
  </div>
)

export default SearchBar;