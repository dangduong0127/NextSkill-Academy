import "./styles.scss";

const TestimonialsSection = () => {
  return (
    <>
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Students Say</h2>
            <p>
              Hear from our students about how Excellence Academy has helped
              them achieve their goals.
            </p>
          </div>
          <div className="testimonials-grid">
            {/* Testimonial 1 */}
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar blue">JD</div>
                <div className="info">
                  <h3>John Doe</h3>
                  <p>Web Development Graduate</p>
                </div>
              </div>
              <div className="stars">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="testimonial-content">
                "The web development bootcamp was exactly what I needed to
                switch careers. The instructors were knowledgeable and
                supportive, and I landed a job within a month of completing the
                course."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar purple">JS</div>
                <div className="info">
                  <h3>Jane Smith</h3>
                  <p>Data Science Student</p>
                </div>
              </div>
              <div className="stars">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="testimonial-content">
                "I had no prior experience in data science, but the course was
                structured in a way that made complex concepts easy to
                understand. The hands-on projects were invaluable for building
                my portfolio."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar green">RJ</div>
                <div className="info">
                  <h3>Robert Johnson</h3>
                  <p>Mobile App Developer</p>
                </div>
              </div>
              <div className="stars">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="testimonial-content">
                "The Flutter course was comprehensive and up-to-date. I was able
                to build and publish my first app before even finishing the
                course. The community support was also fantastic."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
