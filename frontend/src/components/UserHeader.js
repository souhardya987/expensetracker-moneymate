function UserHeader({ username, onLogout }) {
  return (
    <div className="user-section" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
      <h1>Welcome {username || "Guest"}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default UserHeader;
