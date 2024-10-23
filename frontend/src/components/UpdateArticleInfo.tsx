// UpdateArticle.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './UpdateArticle.module.css';

type Article = {
  _id?: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  practice: string;
  claim: string;
  evidence: string;
};

const defaultArticle: Article = {
  title: '',
  authors: '',
  source: '',
  pubyear: '',
  doi: '',
  practice: '',
  claim: '',
  evidence: ''
};

const practices = [
  "Agile Development",
  "Continuous Integration",
  "Test-Driven Development",
  "Code Review",
];

export default function UpdateArticleInfo() {
  const [article, setArticle] = useState<Article>(defaultArticle);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/analyst/${id}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        const formattedData = {
          ...data,
          pubyear: data.pubyear ? new Date(data.pubyear).toISOString().split('T')[0] : ''
        };
        setArticle(formattedData);
      } catch (err) {
        setError('Failed to load article. Please try again.');
      }
    };

    if (id) fetchArticle();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!article.title.trim()) errors.push('Title is required');
    if (!article.authors.trim()) errors.push('Authors are required');
    if (!article.claim.trim()) errors.push('Claim is required');
    if (!article.evidence.trim()) errors.push('Evidence is required');
    if (!article.pubyear) errors.push('Publication year is required');
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      setIsSubmitting(false);
      return;
    }

    try {
      const articlesResponse = await fetch('http://localhost:8082/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...article,
          pubyear: new Date(article.pubyear).toISOString(),
          updated_date: new Date().toISOString()
        }),
      });

      if (!articlesResponse.ok) throw new Error('Failed to submit to articles collection');

      const deleteResponse = await fetch(`http://localhost:8082/api/analyst/${id}`, {
        method: 'DELETE',
      });

      if (!deleteResponse.ok) throw new Error('Failed to delete from analyst collection');

      setSuccess(true);
      setTimeout(() => router.push('/'), 1000);
    } catch (err) {
      setError('Failed to process article. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className="mb-6">
          <Link href="/analyst" className={styles.backButton}>
            Back to Article List
          </Link>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Edit Article</h1>
          <p className={styles.subtitle}>Update article information</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}

        {success && (
          <div className={styles.successMessage}>Article updated successfully!</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {['title', 'authors', 'source', 'doi', 'pubyear', 'practice', 'claim', 'evidence'].map((field) => (
            <div key={field} className={styles.formGroup}>
              <label htmlFor={field} className={styles.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)} {['title', 'authors', 'claim', 'evidence', 'pubyear'].includes(field) && '*'}
              </label>
              {field === 'evidence' ? (
                <textarea
                  id={field}
                  name={field}
                  value={article[field as keyof Article]}
                  onChange={handleChange}
                  className={styles.textarea}
                  required={['title', 'authors', 'claim', 'evidence', 'pubyear'].includes(field)}
                />
              ) : field === 'practice' ? (
                <select
                  id={field}
                  name={field}
                  value={article[field]}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select a practice</option>
                  {practices.map((practice) => (
                    <option key={practice} value={practice}>
                      {practice}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field === 'pubyear' ? 'date' : 'text'}
                  id={field}
                  name={field}
                  value={article[field as keyof Article]}
                  onChange={handleChange}
                  className={styles.input}
                  required={['title', 'authors', 'claim', 'evidence', 'pubyear'].includes(field)}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Updating...' : 'Update Article'}
          </button>
        </form>
      </div>
    </div>
  );
}