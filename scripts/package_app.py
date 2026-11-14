import os
import zipfile
import shutil

applet_dir = '/app/applet'
output_zip = '/app/applet/public/AXOLYT_ORGANIC_ENERGY_App.zip'
artifact_zip = '/.aistudio/artifacts/brain/2bc4ff55-ce79-4bcf-a8f6-59f49df4bd92/AXOLYT_ORGANIC_ENERGY_App.zip'

exclude_dirs = {'node_modules', '.git', 'dist', '.aistudio', '__pycache__'}
exclude_files = {'package-lock.json'}

print("Packaging AXOLYT ORGANIC ENERGY full app into ZIP...")

with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(applet_dir):
        # Filter directories in-place
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file in exclude_files or file.endswith('.zip'):
                continue
            full_path = os.path.join(root, file)
            # Relative path inside zip
            rel_path = os.path.relpath(full_path, applet_dir)
            # Prepend project root folder name inside zip
            archive_name = os.path.join('AXOLYT_ORGANIC_ENERGY', rel_path)
            zipf.write(full_path, archive_name)

print(f"Zip created successfully at: {output_zip} ({os.path.getsize(output_zip) / (1024*1024):.2f} MB)")

# Copy to artifacts
try:
    shutil.copyfile(output_zip, artifact_zip)
    print(f"Copied to artifacts directory: {artifact_zip}")
except Exception as e:
    print(f"Artifact copy error: {e}")
