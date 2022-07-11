import React from 'react';
import { useTranslation } from 'next-i18next';
import { Close } from 'styles/CommonStyled';
import {
	Ul,
	Li
} from '../../styled';

const UploadList = ({
	fileList,
	removeFile,
	playBlob,
	updatePlayBlob,
}) => {
	const { t } = useTranslation();
	const onFileClick = (file) => () => {
		if (file.fileBlob === playBlob) {
			updatePlayBlob('');
		} else {
			updatePlayBlob(file.fileBlob);
		}
	};

	return (
		<React.Fragment>
			{fileList && fileList.length > 0 && (
				<Ul>
					{fileList.map((file, index) => {
						return (
							<Li>
								<Close className="close" onClick={removeFile(index)} />
								<span className="file-details">
									<span className="file-name">{file.file_name}</span>
									<span className="file-size">
										{file.file_type} - {file.file_size}
									</span>
									<span
										role="presentation"
										className="link-btn"
										onClick={onFileClick(file)}
									>
										{file.fileBlob === playBlob ? t('common.stop') : t('common.play')}
									</span>
								</span>
							</Li>
						);
					})}
				</Ul>
			)}
		</React.Fragment>
	);
};

export default UploadList;
