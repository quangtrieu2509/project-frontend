import { PlusOutlined } from "@ant-design/icons";
import { GetProp, Image, Upload, UploadFile, UploadProps } from "antd"
import { UploadChangeParam } from "antd/es/upload";
import { useState } from "react"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const uploadButton = (
  <div className="bg-transparent border-0 cursor-pointer">
    <PlusOutlined />
    <div className="mt-1 poppins-font text-sm">Upload</div>
  </div>
)

interface UploadFilesProps {
  fileList: UploadFile[]
  handleFilesChange?: ((info: UploadChangeParam<UploadFile<any>>) => void)
  handleOnRemove?: (file: any) => void
  filesMax: number
}

export default function UploadFiles(props: UploadFilesProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handleFilePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card" accept="image/png, image/jpeg"
        fileList={props.fileList}
        beforeUpload={(_) => {
          return false
        }}
        onPreview={handleFilePreview}
        onChange={props.handleFilesChange}
        onRemove={props.handleOnRemove}
      >
        {props.fileList.length >= props.filesMax ? null : uploadButton}
      </Upload>
      <Image
        wrapperStyle={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(''),
        }}
        src={previewImage}
      />
    </>
  )
}