import React, { useState, useRef, useEffect } from 'react';

export default function CustomSelect({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption || selectedOption.value === '';

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const selectedEl = dropdownRef.current.querySelector('.is-selected');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        const nextIndex = Math.min(options.length - 1, Math.max(0, currentIndex + 1));
        if (options[nextIndex]) {
          onChange({ target: { name, value: options[nextIndex].value } });
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        const prevIndex = Math.max(0, currentIndex - 1);
        if (options[prevIndex]) {
          onChange({ target: { name, value: options[prevIndex].value } });
        }
      }
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`custom-select-wrapper ${isOpen ? 'is-open' : ''} ${className}`.trim()}
      style={{ position: 'relative' }}
    >
      {/* Hidden Native Select for FormData and fallback serialization */}
      <select
        id={id ? `${id}-native` : undefined}
        name={name}
        value={value}
        onChange={onChange}
        className="custom-select-hidden"
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap'
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Styled Trigger Button */}
      <button
        type="button"
        id={id}
        className="custom-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={handleKeyDown}
      >
        <span className={`custom-select-label ${isPlaceholder ? 'is-placeholder' : ''}`}>
          {displayLabel}
        </span>
        <i className="fa-solid fa-chevron-down custom-select-arrow" aria-hidden="true"></i>
      </button>

      {/* Dropdown Options List */}
      <div ref={dropdownRef} className="custom-select-dropdown" role="listbox">
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <div
              key={opt.value}
              className={`custom-select-option ${isSelected ? 'is-selected' : ''}`}
              role="option"
              aria-selected={isSelected}
              data-value={opt.value}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(opt.value);
              }}
            >
              <span>{opt.label}</span>
              <i className="fa-solid fa-check custom-select-check" aria-hidden="true"></i>
            </div>
          );
        })}
      </div>
    </div>
  );
}
