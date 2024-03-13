
import { Descriptions, Modal, Upload, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

// import file
const UserImport = (props) => {
  // modal open, truyền thêm modal vào

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const propsUpload = {
    name: "file",
    multiple: false,
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
// console.log(props.isModalUserOpen)
  return (
    <>
      <Modal
        title="Basic Modal"
        open={props.isModalUserOpen}
        onOk={()=> {
          props.setIsModalUserOpen(false)
        }}
        onCancel={()=> {
          props.setIsModalUserOpen(false)
        }}
        onText={"Tạo mới"}
        cancelText={"Hủy"}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </>
  );
};

export default UserImport;
