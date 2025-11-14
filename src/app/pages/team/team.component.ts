import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  imports: [CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  showResumeForm = false;
  isUploading = false;
  uploadProgress = 0;
  
  // Form model
  application = {
    fullName: '',
    phoneNumber: '',
    yearsOfExperience: '',
    resume: null as File | null,
    coverLetter: '',
    emailAddress: '',
    positionAppliedFor: ''
  };

  triggerFileInput() {
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  openResumeForm() {
    this.showResumeForm = true;
  }

  closeResumeForm() {
    this.showResumeForm = false;
    this.resetForm();
  }

  onSubmit() {
    // Handle form submission here
    console.log('Application submitted:', this.application);
    
    // You can add your API call here
    // After successful submission:
    this.closeResumeForm();
    alert('Application submitted successfully!');
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        event.target.value = '';
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        event.target.value = '';
        return;
      }
      
      // Start upload simulation
      await this.simulateFileUpload(file);
    }
  }

  private simulateFileUpload(file: File): Promise<void> {
    return new Promise((resolve) => {
      this.isUploading = true;
      this.uploadProgress = 0;
      
      // Simulate upload progress
      const interval = setInterval(() => {
        this.uploadProgress += Math.random() * 15;
        if (this.uploadProgress >= 100) {
          this.uploadProgress = 100;
          clearInterval(interval);
          
          // Small delay to show 100% completion
          setTimeout(() => {
            this.application.resume = file;
            this.isUploading = false;
            this.uploadProgress = 0;
            resolve();
          }, 500);
        }
      }, 200);
    });
  }

  removeFile() {
    this.application.resume = null;
    // Reset file input
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  getFileType(mimeType: string): string {
    const typeMap: { [key: string]: string } = {
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
    };
    return typeMap[mimeType] || 'File';
  }

  private resetForm() {
    this.application = {
      fullName: '',
      phoneNumber: '',
      yearsOfExperience: '',
      resume: null,
      coverLetter: '',
      emailAddress: '',
      positionAppliedFor: ''
    };
    this.isUploading = false;
    this.uploadProgress = 0;
  }
}