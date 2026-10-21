import React from 'react';
import Modal from '../components/ui/Modal';
import { Checkbox } from '../components/form_components/Checkbox';
import { Radio } from '../components/form_components/Radio';
import Selector from '../components/form_components/Selector';
import { ToggleSwitch } from '../components/form_components/ToggleSwitch';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import OnlyIconButton from '../components/button/OnlyIconButton';

// Dynamic Advanced Filters Modal
const AdminAdvancedFiltersModal = ({ 
  isOpen, 
  onClose, 
  title = "Filters", 
  subtitle = "Refine your search to find exactly what you're looking for.",
  filterSections = [] 
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={subtitle}
      maxWidth="full"
      className="max-w-5xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <ToggleSwitch 
            label="Save as default filter" 
            description="Automatically apply these filters next time" 
          />
          <div className="flex items-center gap-3">
            <SecondaryButton onClick={onClose} className="px-6 py-2.5">
              Cancel
            </SecondaryButton>
            <PrimaryButton className="px-6 py-2.5 shadow-sm">
              <i className="ri-filter-3-line mr-2" /> Apply Filters
            </PrimaryButton>
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-between mb-4 mt-2">
        <span className="text-sm text-text-sec font-medium">Select criteria to refine your view:</span>
        <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          <i className="ri-refresh-line" /> Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filterSections.map((section: any, idx: number) => (
          <div key={idx} className="bg-surface border border-border-main rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5 text-text-main font-semibold">
              <i className={`${section.icon} ${section.iconColor || 'text-text-sec'} text-lg`} />
              {section.title}
            </div>
            
            {section.type === 'checkbox' && (
              <div className="flex flex-col gap-4">
                {section.options.map((opt: any) => (
                  <Checkbox key={opt.value} label={opt.label} />
                ))}
              </div>
            )}

            {section.type === 'radio' && (
              <div className="flex flex-col gap-4">
                {section.options.map((opt: any) => (
                  <Radio key={opt.value} name={section.title} label={opt.label} />
                ))}
              </div>
            )}

            {section.type === 'selects' && (
              <div className="flex flex-col gap-5">
                {section.dropdowns.map((dd: any) => (
                  <Selector 
                    key={dd.label}
                    label={dd.label}
                    options={[]} 
                    placeholder={`Select ${dd.label}`}
                  />
                ))}
              </div>
            )}
            
            {section.type === 'custom' && (
              <div className="text-sm text-text-sec italic">Custom component rendering goes here...</div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AdminAdvancedFiltersModal;
