const Uploader = () => {
  return (
    <label style={{ padding: 16, border: "1px dashed #ccc" }}>
      <input style={{ display: "none" }} type="file" accept="image/*" />
    </label>
  );
};

export default Uploader;
