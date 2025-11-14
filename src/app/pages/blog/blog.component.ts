import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  activeTab: string = 'all';
  showMoreArticles: boolean = false;
  
  tabs = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Development' },
    { id: 'backend', label: 'Backend Development' },
    { id: 'frontend', label: 'Frontend Development' },
    { id: 'database', label: 'Database' },
    { id: 'devops', label: 'DevOps' },
    { id: 'cloud', label: 'Cloud Computing' }
  ];

  // Article data with categories
  articles = [
    { id: 1, category: 'backend', default: true },
    { id: 2, category: 'frontend', default: true },
    { id: 3, category: 'mobile', default: true },
    { id: 4, category: 'web', default: true },
    { id: 5, category: 'database', default: true },
    { id: 6, category: 'devops', default: true },
    { id: 7, category: 'cloud', default: false },
    { id: 8, category: 'backend', default: false },
    { id: 9, category: 'frontend', default: false }
  ];

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  getTabClasses(tabId: string): string {
    const baseClasses = 'px-4 py-2 rounded-2xl text-sm font-medium transition-colors';
    if (this.activeTab === tabId) {
      return `${baseClasses} bg-[#9333ea] text-white`;
    } else {
      return `${baseClasses} bg-white text-gray-700 hover:bg-gray-50`;
    }
  }

  shouldShowArticle(articleCategory: string): boolean {
    if (!this.showMoreArticles) {
      // Show only default articles (first 6)
      const isDefaultArticle = this.articles.some(article => 
        article.category === articleCategory && article.default
      );
      
      if (this.activeTab === 'all') {
        return isDefaultArticle;
      } else {
        return this.activeTab === articleCategory && isDefaultArticle;
      }
    } else {
      // Show all articles when Load More is clicked
      if (this.activeTab === 'all') {
        return true;
      } else {
        return this.activeTab === articleCategory;
      }
    }
  }

  loadMoreArticles(): void {
    this.showMoreArticles = true;
  }

  showLessArticles(): void {
    this.showMoreArticles = false;
  }

  // Helper method for placeholder images
  getArticleImage(articleNumber: number): string {
    const colors = ['4F46E5', '7C3AED', '059669', 'DC2626', 'EA580C', '2563EB', 'CA8A04', 'DB2777', '0891B2'];
    const text = `Article+${articleNumber}`;
    return `https://via.placeholder.com/400x200/${colors[articleNumber-1]}/FFFFFF?text=${text}`;
  }
}