import React, { useState } from 'react';
import './SliceTool.css';

const SliceTool = () => {
  // 切片工具demo数据
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewPages, setPreviewPages] = useState([]);
  const [selectedSlices, setSelectedSlices] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // 模拟文档预览数据
  const generatePreviewPages = (file) => {
    const pages = [];
    const pageCount = Math.floor(Math.random() * 10) + 5; // 5-15页
    
    for (let i = 1; i <= pageCount; i++) {
      pages.push({
        id: `page-${i}`,
        number: i,
        content: `这是 ${file.name} 的第 ${i} 页内容预览...`,
        selected: false
      });
    }
    
    return pages;
  };

  // 处理文件上传
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newFiles = files.map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type,
      size: file.size,
      uploaded: new Date().toISOString(),
      status: 'uploaded'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // 自动选择第一个上传的文件
    if (newFiles.length > 0 && !selectedFile) {
      handleFileSelect(newFiles[0]);
    }
  };

  // 选择文件
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setPreviewPages(generatePreviewPages(file));
    setSelectedSlices([]);
  };

  // 切换页面选择状态
  const togglePageSelection = (pageId) => {
    setPreviewPages(prev => 
      prev.map(page => 
        page.id === pageId 
          ? { ...page, selected: !page.selected }
          : page
      )
    );
    
    // 更新选中的切片
    setSelectedSlices(prev => {
      if (prev.includes(pageId)) {
        return prev.filter(id => id !== pageId);
      } else {
        return [...prev, pageId];
      }
    });
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    const allSelected = previewPages.every(page => page.selected);
    setPreviewPages(prev => 
      prev.map(page => ({ ...page, selected: !allSelected }))
    );
    
    setSelectedSlices(allSelected ? [] : previewPages.map(page => page.id));
  };

  // 开始切片处理
  const startSlicing = () => {
    if (selectedSlices.length === 0) {
      alert('请至少选择一个页面进行切片');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('正在处理切片...');

    // 模拟处理过程
    setTimeout(() => {
      setProcessingStatus('正在生成结构化数据...');
    }, 1000);

    setTimeout(() => {
      setProcessingStatus('处理完成！');
      setIsProcessing(false);
      
      // 模拟成功处理后更新文件状态
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === selectedFile.id 
            ? { ...file, status: 'processed' }
            : file
        )
      );
    }, 3000);
  };

  // 删除文件
  const deleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
      setPreviewPages([]);
      setSelectedSlices([]);
    }
  };

  return (
    <div className="slice-tool">
      <div className="slice-tool-header">
        <h2>切片工具</h2>
        <p>处理分结构化文档（PDF/PPT），提取关键信息并生成结构化数据</p>
      </div>

      <div className="slice-tool-content">
        {/* 左侧文件管理区域 */}
        <div className="file-management-panel">
          <div className="panel-header">
            <h3>文件管理</h3>
            <div className="upload-area">
              <label htmlFor="file-upload" className="upload-btn">
                <span className="upload-icon">📁</span>
                上传文件
              </label>
              <input 
                id="file-upload" 
                type="file" 
                multiple 
                accept=".pdf,.ppt,.pptx" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <div className="file-types">支持 PDF, PPT, PPTX 格式</div>
            </div>
          </div>

          {/* 上传文件列表 */}
          <div className="file-list">
            {uploadedFiles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <p>暂无上传的文件</p>
                <p>点击上方按钮上传文档</p>
              </div>
            ) : (
              uploadedFiles.map(file => (
                <div 
                  key={file.id} 
                  className={`file-item ${selectedFile?.id === file.id ? 'selected' : ''}`}
                  onClick={() => handleFileSelect(file)}
                >
                  <div className="file-info">
                    <span className={`file-icon ${file.type.includes('pdf') ? 'pdf' : 'ppt'}`}>
                      {file.type.includes('pdf') ? '📄' : '📊'}
                    </span>
                    <div className="file-details">
                      <div className="file-name">{file.name}</div>
                      <div className="file-meta">
                        <span className="file-size">{Math.round(file.size / 1024)} KB</span>
                        <span className="file-date">
                          {new Date(file.uploaded).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="file-actions">
                    <span className={`file-status ${file.status}`}>
                      {file.status === 'uploaded' ? '已上传' : '已处理'}
                    </span>
                    <button 
                      className="delete-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 右侧文档处理区域 */}
        <div className="document-processing-panel">
          {selectedFile ? (
            <>
              <div className="panel-header">
                <h3>文档预览与切片</h3>
                <div className="preview-info">
                  <span className="file-name">{selectedFile.name}</span>
                  <span className="page-count">{previewPages.length} 页</span>
                </div>
              </div>

              {/* 切片控制栏 */}
              <div className="slice-controls">
                <div className="selection-controls">
                  <button 
                    className="control-btn select-all-btn"
                    onClick={toggleSelectAll}
                  >
                    {previewPages.every(page => page.selected) ? '取消全选' : '全选'}
                  </button>
                  <span className="selection-info">
                    已选择 {selectedSlices.length} 页
                  </span>
                </div>
                <button 
                  className="control-btn process-btn"
                  onClick={startSlicing}
                  disabled={selectedSlices.length === 0 || isProcessing}
                >
                  {isProcessing ? processingStatus : '开始切片'}
                </button>
              </div>

              {/* 页面预览区域 */}
              <div className="page-preview">
                <div className="pages-grid">
                  {previewPages.map(page => (
                    <div 
                      key={page.id} 
                      className={`page-item ${page.selected ? 'selected' : ''}`}
                      onClick={() => togglePageSelection(page.id)}
                    >
                      <div className="page-checkbox">
                        <input 
                          type="checkbox" 
                          checked={page.selected} 
                          onChange={() => togglePageSelection(page.id)}
                        />
                      </div>
                      <div className="page-content">
                        <div className="page-number">第 {page.number} 页</div>
                        <div className="page-text">{page.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-preview">
              <div className="empty-icon">👆</div>
              <p>请从左侧选择一个文件进行预览和切片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliceTool;