import { Modal } from 'antd';

interface Props {
  title: string;
  open: boolean;
  hideModal: () => void;
  performAction: () => void;
}

const CustomModal = (props: Props) => {
  const { title, open, hideModal, performAction } = props;
  return (
    <Modal title="Modal" open={open} onCancel={hideModal} onOk={performAction}>
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
