# Lean static server for the Coming Soon page (~1–2 MB image).
FROM busybox:1.37.0-uclibc

COPY coming-soon.html /www/index.html

USER nobody
EXPOSE 8080
CMD ["httpd", "-f", "-p", "8080", "-h", "/www"]
